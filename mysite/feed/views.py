from django.core.paginator import Paginator
from django.http import HttpResponseServerError
from django.shortcuts import render
import feedparser

def index(request):
    # URL of the RSS feed to fetch
    url = "https://feeds.bbci.co.uk/news/world/asia/rss.xml"

    try:
        # Fetch the feed using feedparser
        feed = feedparser.parse(url)

        # Get the page number from the request parameters, defaulting to 1
        page_num = request.GET.get('page', 1)

        # Paginate the feed entries
        paginator = Paginator(feed.entries, 3)  # 3 entries per page
        page = paginator.page(page_num)

        # Pass the paginated entries and feed to the template
        return render(request, 'feed.html', {'page': page, 'feed': feed})

    except (feedparser.FeedParserError, ConnectionError) as e:
        # If there is an error, return a server error response
        return HttpResponseServerError(f"Error fetching RSS feed: {e}")
