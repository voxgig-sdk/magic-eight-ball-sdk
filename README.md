# MagicEightBall SDK

Get random Magic 8-Ball style fortune-telling responses with a single HTTP call

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Magic Eight Ball API

The Magic Eight Ball API returns a random fortune-telling response in the style of the classic toy. The hosted service is community-run and maintained alongside the open-source [abunchofapis/magic-eight-ball](https://github.com/abunchofapis/magic-eight-ball) project.

What you get from the API:

- A single GET endpoint that returns one random Magic 8-Ball style answer per call.
- Suitable for novelty UI elements, chatbots, tutorials, and tests that need a small no-auth endpoint.

Operational notes: no authentication is required and no rate limits are documented. The community catalogue at [freepublicapis.com](https://freepublicapis.com/magic-eight-ball-api) reports that CORS is disabled on the hosted endpoint, so browser-side calls may need a proxy.

## Try it

**TypeScript**
```bash
npm install magic-eight-ball
```

**Python**
```bash
pip install magic-eight-ball-sdk
```

**PHP**
```bash
composer require voxgig/magic-eight-ball-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/magic-eight-ball-sdk/go
```

**Ruby**
```bash
gem install magic-eight-ball-sdk
```

**Lua**
```bash
luarocks install magic-eight-ball-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MagicEightBallSDK } from 'magic-eight-ball'

const client = new MagicEightBallSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o magic-eight-ball-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "magic-eight-ball": {
      "command": "/abs/path/to/magic-eight-ball-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **MagicEightBall** | A single random fortune-telling response returned by the hosted Magic 8-Ball service. | `/magic/JSON/{question}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from magiceightball_sdk import MagicEightBallSDK

client = MagicEightBallSDK({})


# Load a specific magiceightball
magiceightball, err = client.MagicEightBall(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'magiceightball_sdk.php';

$client = new MagicEightBallSDK([]);


// Load a specific magiceightball
[$magiceightball, $err] = $client->MagicEightBall(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/magic-eight-ball-sdk/go"

client := sdk.NewMagicEightBallSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "MagicEightBall_sdk"

client = MagicEightBallSDK.new({})


# Load a specific magiceightball
magiceightball, err = client.MagicEightBall(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("magic-eight-ball_sdk")

local client = sdk.new({})


-- Load a specific magiceightball
local magiceightball, err = client:MagicEightBall(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MagicEightBallSDK.test()
const result = await client.MagicEightBall().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MagicEightBallSDK.test(None, None)
result, err = client.MagicEightBall(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MagicEightBallSDK::test(null, null);
[$result, $err] = $client->MagicEightBall(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.MagicEightBall(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MagicEightBallSDK.test(nil, nil)
result, err = client.MagicEightBall(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:MagicEightBall(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Magic Eight Ball API

- Upstream: [https://freepublicapis.com/magic-eight-ball-api](https://freepublicapis.com/magic-eight-ball-api)
- API docs: [https://github.com/abunchofapis/magic-eight-ball](https://github.com/abunchofapis/magic-eight-ball)

- Source code for the upstream service is published under the [AGPL-3.0](https://github.com/abunchofapis/magic-eight-ball) license.
- The AGPL is copyleft: derivative works and network-deployed modifications must make source available under the same terms.
- No separate terms of use are published for the hosted endpoint; check the repository before relying on it in production.

---

Generated from the Magic Eight Ball API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
