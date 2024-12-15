namespace PatchSample.Functions.Person.Repository;

public class PersonRepository
{
    private readonly List<PersonModel> _people =
    [
        new (){ Id = Guid.NewGuid().ToString("N"), Age = 25, Name = "Jhon Doe", Address = new(){ City = "Montréal", State = "Quebec", Street = "123, Rue Abc", Zip = "A1A1A1"}},
        new (){ Id = Guid.NewGuid().ToString("N"), Age = 32, Name = "Mary Clinton", Address = new(){ City = "Toronto", State = "Ontario", Street = "456, Rue New Test", Zip = "B2B2B2"}}
    ];

    public IEnumerable<PersonModel> GetAll() => _people;

    public PersonModel? GetById(string id) => _people.FirstOrDefault(p => p.Id == id);

    public PersonModel Add(PersonModel person)
    {
        person.Id = Guid.NewGuid().ToString("N");
        _people.Add(person);
        return person;
    }

    public PersonModel? Update(PersonModel person)
    {
        var existing = GetById(person.Id);
        if (existing is null)
            return null;
        _people.Remove(existing);
        _people.Add(person);
        return person;
    }

    public void Delete(string id)
    {
        var person = GetById(id);
        if (person is not null)
            _people.Remove(person);
    }
}
