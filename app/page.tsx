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
