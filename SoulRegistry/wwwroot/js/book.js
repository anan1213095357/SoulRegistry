window.deathBook = {
    dotNetHelper: null,
    init: async function (helper) {
        this.dotNetHelper = helper;

        // 关键修改：指向本地的 models 文件夹
        const MODEL_URL = '/models';

        try {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
            ]);
            document.getElementById('ai-loading').style.display = 'none';
        } catch (err) {
            document.getElementById('loading-text').innerHTML = "❌ 法阵模型下载失败！<br>" + err.message;
        }
    },

    triggerUpload: function () {
        let fileInput = document.getElementById('ghost-file-upload');
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.id = 'ghost-file-upload';
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);

            fileInput.addEventListener('change', async (e) => {
                if (!e.target.files.length) return;
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onload = async (event) => {
                    const img = new Image();
                    img.onload = async () => await window.deathBook.processImage(img);
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
                fileInput.value = ""; // reset
            });
        }
        fileInput.click();
    },

    processImage: async function (img) {
        // 通知 Blazor 开启 Loading
        await this.dotNetHelper.invokeMethodAsync('SetLoadingState', true);

        try {
            const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detection) {
                alert("生死簿查明：此画中并无生人面孔！(未检测到人脸)");
                await this.dotNetHelper.invokeMethodAsync('SetLoadingState', false);
                return;
            }

            // 水墨特效 Canvas 处理
            const canvas = document.createElement('canvas');
            canvas.width = 150; canvas.height = 200;
            const ctx = canvas.getContext('2d');
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / scale - img.width) / 2;
            const y = (canvas.height / scale - img.height) / 2;
            ctx.scale(scale, scale);
            ctx.drawImage(img, x, y);
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                let gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                gray = ((gray / 255 - 0.6) * 2.0 + 0.5) * 255;
                gray = Math.max(0, Math.min(255, gray));
                data[i] = 26; data[i + 1] = 26; data[i + 2] = 26;
                data[i + 3] = 255 - gray;
            }
            ctx.putImageData(imgData, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');

            // 将面部矩阵 (Array) 和图片发回 C#
            await this.dotNetHelper.invokeMethodAsync('OnFaceProcessed', Array.from(detection.descriptor), dataUrl);
        } catch (err) {
            alert("推演中断：" + err);
            await this.dotNetHelper.invokeMethodAsync('SetLoadingState', false);
        }
    }
};