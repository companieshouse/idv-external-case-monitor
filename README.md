# idv-external-case-monitor

A lambda that triggers the idv-external-case-api to start an asynchronous poll-and-update cycle for complex 
(non-OneLogin) identity verification backlog cases. The Lambda returns immediately after successfully triggering the API.

### The Lambda function

- Invoked on a schedule by AWS EventBridge.
- Sends an authenticated request to idv-external-case-api to initiate a run.
- Exits as soon as the trigger request succeeds. The long-running work happens in idv-external-case-api.
- Emits structured logs for traceability (invocation time, response status, and errors).

### Terraform deployment

All dependent AWS resources are provisioned by Terraform and deployed from a concourse pipeline.
Click "plan" then "apply" jobs with desired environment to deploy the lambda.
The pipeline is capable of deploying everything so manual deployment should not be necessary. For
instructions on Terraform provisioning, see [here](/terraform/README.md).

### Prerequisites

- Node.js (v24 recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Local Development & Testing

- Run tests:
  ```bash
  npm test
  ```
- Build the project:
  ```bash
  npm run build
  ```

### Environment Variables

Environment variables required to execute the Lambda:

| Name        | Description                                            |
| ----------- | ------------------------------------------------------ |
| `LOG_LEVEL` | Logging level (e.g., `info`, `debug`, `warn`, `error`) |

---

## Further Information

- [Architecture View](https://companieshouse.atlassian.net/wiki/spaces/~7120204e84cbf1c489428f9a5d93a92d9df21c/pages/5428674699/IDV+Alternate+Routes+Product+Route+Design+Proposal#New-Service---TU-Verification-Adapter-Service)
- [High level design for complex case monitoring](https://companieshouse.atlassian.net/wiki/spaces/HR/pages/5571051578/High+level+design+for+complex+case+monitoring)

---
