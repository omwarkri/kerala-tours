## GitHub Copilot Chat

- Extension: 0.40.1 (prod)
- VS Code: 1.112.0 (07ff9d6178ede9a1bd12ad3399074d726ebe6e43)
- OS: linux 6.17.0-19-generic x64
- GitHub Account: OmWarkari

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.207.73.85 (3 ms)
- DNS ipv6 Lookup: Error (9 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (2 ms)
- Electron fetch (configured): HTTP 200 (24 ms)
- Node.js https: HTTP 200 (114 ms)
- Node.js fetch: HTTP 200 (25 ms)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.114.22 (11 ms)
- DNS ipv6 Lookup: Error (3 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (48 ms)
- Electron fetch (configured): HTTP 200 (1714 ms)
- Node.js https: HTTP 200 (825 ms)
- Node.js fetch: HTTP 200 (834 ms)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: 20.250.119.64 (44 ms)
- DNS ipv6 Lookup: timed out after 10 seconds
- Proxy URL: None (31 ms)
- Electron fetch (configured): HTTP 200 (640 ms)
- Node.js https: HTTP 200 (488 ms)
- Node.js fetch: HTTP 200 (448 ms)

Connecting to https://mobile.events.data.microsoft.com: HTTP 404 (355 ms)
Connecting to https://dc.services.visualstudio.com: HTTP 404 (891 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (789 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (829 ms)
Connecting to https://default.exp-tas.com: HTTP 400 (167 ms)

Number of system certificates: 435

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).