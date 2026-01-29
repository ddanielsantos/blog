---
draft: true
title: "creating Rest APIs with Rust"
description: "How to create a well documented API with Rust"
date: "12 Dec, 2022"
tags: ["rust", "rest", "api", "openapi"]
signature: rcYLaKSq1ECASrvLIzujqMhM88n9bB5nZlJVsr9b4Q68VmYeshkLnh+7G7LF7zyVMWb5bST1umaA+5LqCGzeCw==
---

In this series, I'll share the learnings I got developing another personal project, today I bring a brief introduction to building Rest APIs with Rust.

### Choosing the framework

Rust has big names in the framework market for building REST APIs: Rocket, Axum, Warp, and Actix. I only tested the first two and ended up opting for Axum.

### Hot reload

A feature that I look for whenever possible in my development environment is Hot Reload, with it, every time a file is changed and saved the application restarts, so the cycle of writing-evaluating-refactoring code becomes extremely fast, for Rust, we have [cargo watch](https://crates.io/crates/cargo-watch), I suggest taking a look at the documentation for more details.

### Hello, Axum

We will start by starting a new project with Cargo

```bash
$ cargo new hello_world --bin
```

Add the following dependencies to `Cargo.toml` :

```toml
[dependencies]
axum = "0.6"
tokio = { version = "1.22.0", features = ["full"] }
serde = { version = "1.0.149", features = ["derive"] }
```

In addition to Axum, as already mentioned, we are adding Tokio as our async runtime, and Serde, to handle JSON serialization and deserialization.

I recommend the following posts if you don't know what an async runtime is and why we need one in this scenario

- [what is a runtime](https://kerkour.com/rust-async-await-what-is-a-runtime)
- [how to implement an async main function](https://users.rust-lang.org/t/how-to-implement-async-await-in-main/38007)

With the dependencies installed, we'll edit the `src/main.rs` file:

```rust
// src/main.rs

use std::{error::Error, net::SocketAddr};

use axum::{
    routing::get,
    Router,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));

	let app = Router::new().route("/", get(|| async { "Hello, Axum" }));

    println!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}
```

Now we can run our application with `cargo watch -x run`, and it will respond to `GET` requests on the `http://127.0.0.1:8000/` endpoint

```bash
curl -X 'GET' \
  'http://127.0.0.1:8000/'
```

```bash
Hello, Axum
```

On line x we register the `GET /` endpoint, Axum calls the functions that resolve endpoints as handlers, and handlers can return any structure that implements the `IntoResponse` trait. We can start the code split by moving the closure into a function:

```rust
// add use axum::http::StatusCode;

pub async fn hello_axum() -> impl IntoResponse {
    (StatusCode::OK, "Hello, Axum")
}
```

On line x, we place our handler:

```rust
// add use axum::http::StatusCode;

	let app = Router::new().route("/", get(hello_axum));
```

### Documentation

With an endpoint defined, now it's a good time to set up the API documentation. At this point, I believe that a specification like OpenApi, together with Swagger for its visualization, is a good combo.

To implement them, we'll need some libraries, one responsible for the specification and the other for its presentation, so let's go back to the `Cargo.toml` file and add `utoipa` and `utoipa-swagger-UI` as dependencies:

```toml
[dependencies]
axum = "0.6"
tokio = { version = "1.22.0", features = ["full"] }
serde = { version = "1.0.149", features = ["derive"] }
utoipa = { features = ["axum_extras"], version = "2.4.2" }
utoipa-swagger-ui = { features = ["axum"], version = "3.0.1" }
```

And then, we use Utoipa's [path attribute](https://docs.rs/utoipa/latest/utoipa/attr.path.html) in our handler:

```rust
#[utoipa::path(
    get,
    path = "/",
    responses(
        (status = 200, description = "Send a salute from Axum")
    )
)]
pub async fn hello_axum() -> impl IntoResponse {
    (StatusCode::OK, "Hello, Axum")
}
```

A Rest API can contain many different endpoints, and we need a point where we can unite all these specifications, for that, Utoipa provides the derive macro `OpenApi`, and by adding it to a struct, we can store all the endpoints of our application through the paths parameter of the `#[openapi]` attribute:

```rust
// add use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(paths(hello_axum))]
pub struct ApiDoc;
```

Once that's done, we can expose the documentation on an endpoint with `SwaggerUi`, and attach it to our application, using the `Router.merge` method:

```rust
// add use utoipa_swagger_ui::SwaggerUi;

let app = Router::new()
        .route("/", get(hello_axum))
        .merge(SwaggerUi::new("/swagger-ui").url("/api-doc/openapi.json", ApiDoc::openapi()));
```

And finally, if we go to `http://127.0.0.1:8000/swagger-ui/`, we'll see the Swagger interface:

![Swagger interface, displaying our only endpoint](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6g0q5kfyoaerty0l5odp.png)

From Utoipa, we have a range of possibilities, we can define the body and header of the requests, the HTTP codes to be returned, the format of the responses, and so on, it is worth taking some time in the library documentation to extract the maximum of OpenApi.

The post ends here, but in the next one, we will have some improvements, such as connection to a database and integration tests.
