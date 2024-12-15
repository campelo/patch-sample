namespace PatchSample.Functions.Person.Dtos;

public class PersonModel
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public AddressModel? Address { get; set; }
}
