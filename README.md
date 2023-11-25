NEXT revalidate bug

The following code features a static page with a fetch call set to revalidate every 5 seconds. This causes the page to also revalidate every 5 seconds, as expected.

But when the page revalidates the fetch-call returns a stale response and revaldate itself, causing a revalidate chain that doubles the time it takes to refresh data, and causes extra calls.

```
async function Page() {
  const response = await fetch(
    "http://worldtimeapi.org/api/timezone/Europe/Oslo",
    {
      next: {
        revalidate: 5,
      },
    }
  );

  const json = (await response.json()) as { datetime: string };

  // Note: function is run twice for some reason. This is a different bug: https://github.com/vercel/next.js/issues/58736
  console.log("datetime", json.datetime);

  return (
    <div>
      <h1>Time should update every 5 seconds. Not every 10.</h1>
      <p>{json.datetime}</p>
    </div>
  );
}

export default Page;
```

## Diagram showing what happens

![image](https://github.com/hallatore/revalidate-bug/assets/365605/22d189fe-07da-47df-8b4e-f90b2d8d2ab0)
