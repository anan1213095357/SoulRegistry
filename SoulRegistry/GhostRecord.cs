using FreeSql.DataAnnotations;

namespace SoulRegistry
{
    public class GhostRecord
    {
        [Column(IsPrimary = true, IsIdentity = true)]
        public int Id { get; set; }

        public int RecordIndex { get; set; } // 页面位置标识 (Front/Back)
        public string Name { get; set; } = string.Empty;
        public string Birth { get; set; } = string.Empty;
        public string Death { get; set; } = string.Empty;
        public string Intro { get; set; } = string.Empty;

        [Column(DbType = "text")]
        public string ImageBase64 { get; set; } = string.Empty;

        [Column(DbType = "text")]
        public string FaceDescriptorJson { get; set; } = string.Empty; // 存放 double[] 转换的 JSON
    }
}
