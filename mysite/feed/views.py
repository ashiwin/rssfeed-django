from django.http import HttpResponseServerError
from django.shortcuts import render
import feedparser

def index(request):
    # URL of the RSS feed to fetch
    url = "https://feeds.bbci.co.uk/news/world/asia/rss.xml"

    try:
        # Fetch the feed using feedparser
        feed = feedparser.parse(url)

        # Pass the feed to the template
        return render(request, 'feed.html', {'feed': feed})

    except (feedparser.FeedParserError, ConnectionError) as e:
        # If there is an error, return a server error response
        return HttpResponseServerError(f"Error fetching RSS feed: {e}")
