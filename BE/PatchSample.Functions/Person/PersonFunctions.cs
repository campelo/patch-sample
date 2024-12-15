using Newtonsoft.Json;

namespace PatchSample.Functions.Person;

public class PersonFunctions(PersonRepository personRepository)
{
    [Function($"{nameof(Person)}_{nameof(GetAll)}")]
    public IActionResult GetAll(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = nameof(Person))]
        HttpRequest req)
    {
        var all = personRepository.GetAll();
        return new OkObjectResult(all);
    }

    [Function($"{nameof(Person)}_{nameof(Get)}")]
    public IActionResult Get(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = $"{nameof(Person)}/{{id}}")]
        HttpRequest req,
        string id)
    {
        var person = personRepository.GetById(id);
        return new OkObjectResult(person);
    }

    [Function($"{nameof(Person)}_{nameof(Create)}")]
    public IActionResult Create(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = $"{nameof(Person)}")]
        HttpRequest req)
    {
        var person = req.ReadFromJsonAsync<PersonModel>().Result;
        if (person is null)
            return new BadRequestResult();
        person = personRepository.Add(person);
        return new OkObjectResult(person);
    }

    [Function($"{nameof(Person)}_{nameof(Update)}")]
    public IActionResult Update(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = $"{nameof(Person)}/{{id}}")]
        HttpRequest req,
        string id)
    {
        var updatedPerson = req.ReadFromJsonAsync<PersonModel>().Result;
        if (updatedPerson == null)
            return new BadRequestResult();

        var existingPerson = personRepository.GetById(id);
        if (existingPerson == null)
            return new NotFoundResult();

        updatedPerson.Id = id;
        updatedPerson = personRepository.Update(updatedPerson);
        return new OkObjectResult(updatedPerson);
    }

    [Function($"{nameof(Person)}_{nameof(Patch)}")]
    public IActionResult Patch(
        [HttpTrigger(AuthorizationLevel.Anonymous, "patch", Route = $"{nameof(Person)}/{{id}}")]
        HttpRequest req,
        string id)
    {
        var existingPerson = personRepository.GetById(id);
        if (existingPerson is null)
            return new NotFoundResult();

        string requestBody = new StreamReader(req.Body).ReadToEndAsync().Result;
        var patchDocument = JsonConvert.DeserializeObject<JsonPatchDocument<PersonModel>>(requestBody);
        if (patchDocument is null)
            return new BadRequestResult();

        patchDocument.ApplyTo(existingPerson);
        var updatedPerson = personRepository.Update(existingPerson);
        return new OkObjectResult(updatedPerson);
    }

    [Function($"{nameof(Person)}_{nameof(Delete)}")]
    public IActionResult Delete(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = $"{nameof(Person)}/{{id}}")]
        HttpRequest req,
        string id)
    {
        personRepository.Delete(id);
        return new NoContentResult();
    }
}
