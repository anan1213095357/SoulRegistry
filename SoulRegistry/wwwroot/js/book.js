window.deathBook = {
    dotNetHelper: null,
    init: async function (helper) {
        this.dotNetHelper = helper;
        // 废弃原本的 AI 模型加载，直接解除加载遮罩
        const loadingEl = document.getElementById('ai-loading');
        if (loadingEl) loadingEl.style.display = 'none';
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
        await this.dotNetHelper.invokeMethodAsync('SetLoadingState', true);

        try {
            // 【核心修改】图像特征提取 (感知哈希 AHash)
            // 压缩到 8x8 提取 64 个特征值，完全无视是否是人脸
            const featCanvas = document.createElement('canvas');
            featCanvas.width = 8;
            featCanvas.height = 8;
            const featCtx = featCanvas.getContext('2d');
            featCtx.drawImage(img, 0, 0, 8, 8);
            const featData = featCtx.getImageData(0, 0, 8, 8).data;

            let grayValues = [];
            let sum = 0;
            for (let i = 0; i < featData.length; i += 4) {
                let g = featData[i] * 0.299 + featData[i + 1] * 0.587 + featData[i + 2] * 0.114;
                grayValues.push(g);
                sum += g;
            }
            let avg = sum / 64;
            // 生成 64 维特征向量 (1或0)
            const descriptor = grayValues.map(g => g >= avg ? 1.0 : 0.0);

            // ================= 保持原有的阴间水墨特效 =================
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

            // 发送自定义的 64 维图片特征给 C#
            await this.dotNetHelper.invokeMethodAsync('OnFaceProcessed', descriptor, dataUrl);
        } catch (err) {
            alert("推演中断：" + err);
            await this.dotNetHelper.invokeMethodAsync('SetLoadingState', false);
        }
    }
};