# Patch sample

This project is only for demonstration purposes. **For use in Production environments, there are some changes to be done and/or adapted.**

Before running in local environment, you can use this sample of local.settings.json:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated"
  },
  "Host": {
    "CORS": "*",
    "CORS_SUPPORT_CREDENTIALS": false
  }
}
```

Run BE (.NET Azure Function) and FE (Angular) applications.