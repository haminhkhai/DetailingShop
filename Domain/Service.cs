namespace Domain
{
    public class Service
    {
        public Guid Id { get; set; }
        public string VehicleType { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public string ImageId { get; set; }
        public string Image { get; set; }
        public ICollection<AddOn> AddOns { get; set; }
    }
}