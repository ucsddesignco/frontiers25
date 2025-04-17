export async function GET() {
    try {
      return new Response("This is a test", { status: 200 })
    } catch (error) {
      console.error('Failed to fetch events:', error);
      return new Response("Error: Failed to revalidate events", { status: 500 })
    }
  }