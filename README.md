dispatchR
=========

Typescript - Event Dispatcher


Examples
--------

### Emit

Fire and forget:

``` typescript
import es = require("eventing/dispatchR");

public refresh(): void {
  es.getInstance().emit("stateChanged");
}
```

Async (requires QPromise):
``` typescript
import es = require("eventing/dispatchR");

public refresh(): void {
  es.getInstance().emit("stateChanged", true);
}
```

With arguments:

``` typescript
import es = require("eventing/dispatchR");

public refresh(): void {
  es.getInstance().emit("stateChanged", false, "firstArgument", ["someMoreArguments"]);
}
```

### On

Subscribe / listen to an event:

``` typescript
import es = require("eventing/dispatchR");

public setUp(): void {
    es.getInstance().on("stateChanged", () => alert("stateChanged"), this);
}
```

### Off

Unsubscripe from an event:

``` typescript
import es = require("eventing/dispatchR");

public setUp(): void {
    es.getInstance().off("stateChanged", this);
}
```
