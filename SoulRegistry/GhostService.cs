using System.Text.Json;

namespace SoulRegistry.Data
{
    public class GhostService
    {
        private readonly IFreeSql _fsql;

        public GhostService(IFreeSql fsql)
        {
            _fsql = fsql;
            // 自动同步实体结构到数据库表
            _fsql.CodeFirst.SyncStructure<GhostRecord>();
        }

        // 获取已保存的所有记录
        public List<GhostRecord> GetAllRecords()
        {
            return _fsql.Select<GhostRecord>().ToList();
        }

        // 保存新记录
        public void SaveRecord(GhostRecord record)
        {
            _fsql.Insert(record).ExecuteAffrows();
        }

        public bool IsDuplicate(double[] newDescriptor)
        {
            var allRecords = GetAllRecords();
            foreach (var record in allRecords)
            {
                if (string.IsNullOrEmpty(record.FaceDescriptorJson)) continue;

                var savedDesc = JsonSerializer.Deserialize<double[]>(record.FaceDescriptorJson);
                if (savedDesc == null) continue;

                double distance = CalculateEuclideanDistance(newDescriptor, savedDesc);
                // 【修改阈值】：由于采用 AHash，距离小于 3.0 (代表最多允许约 9 个区块误差) 判定为同一张图
                if (distance < 3.0)
                {
                    return true;
                }
            }
            return false;
        }

        private double CalculateEuclideanDistance(double[] desc1, double[] desc2)
        {
            if (desc1.Length != desc2.Length) return double.MaxValue;
            double sum = 0;
            for (int i = 0; i < desc1.Length; i++)
            {
                double diff = desc1[i] - desc2[i];
                sum += diff * diff;
            }
            return Math.Sqrt(sum);
        }
        public int? FindRecordIndexByFace(double[] newDescriptor)
        {
            var allRecords = GetAllRecords();
            foreach (var record in allRecords)
            {
                if (string.IsNullOrEmpty(record.FaceDescriptorJson)) continue;

                var savedDesc = JsonSerializer.Deserialize<double[]>(record.FaceDescriptorJson);
                if (savedDesc == null) continue;

                // 【修改阈值】：同样改为 3.0
                if (CalculateEuclideanDistance(newDescriptor, savedDesc) < 3.0)
                {
                    return record.RecordIndex;
                }
            }
            return null; // 查无此图
        }
    }
}