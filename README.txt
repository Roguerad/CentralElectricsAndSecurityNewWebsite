CENTRAL ELECTRICS & SECURITY - NEW WEBSITE
==========================================
Upload everything in this folder to the website root (same place as the
current index.html). Page names match the old site so existing links/Google
results keep working. The contact form has been removed (spam); the
Contact page now has Call and Email buttons instead. The old contact.php
on your server can be deleted.

IMAGES
- Every image the site uses is included in the images/ folder. Nothing
  loads from the old site any more, so the old images can be removed once
  the new site is uploaded.
- A few files (logo icon, share images, one photo) are referenced by full
  web address for Google and link previews. They are in this zip and work
  once it is uploaded to www.centralelectricsandsecurity.co.uk.

SHOWCASE REEL (new photos)
- Search the pages for "SHOWCASE REEL" - copy a <figure> line per new photo.
  Short videos (.mp4) are supported too (example in the comment).

GOOGLE REVIEWS
- Review buttons link straight to your Google listing and your Derbyshire
  Trusted Trader profile / feedback form.
- The Trusted Trader rating line ("5 out of 5 - 26 reviews") is typed in, so
  update the number in the pages now and then as more reviews come in.
- To show live review cards on the site: create a Google Maps API key with
  "Places API (New)" enabled, restrict it to your domain, and paste it into
  GOOGLE_API_KEY at the top of js/main.js.

CLICK TO CALL
- Phone number is tappable everywhere; on phones there's a fixed
  Call / Quote / Review bar at the bottom of the screen.

SEO - AFTER THE SITE IS LIVE
- Add the site to Google Search Console (search.google.com/search-console)
  and submit: https://www.centralelectricsandsecurity.co.uk/sitemap.xml
- If you change opening hours, update them on Google, the Contact page,
  the footer and the business details in each page's <head>.

SPEED (Google Lighthouse)
- All page styles are in one shared file: css/style.css (upload the css
  folder). The photos come in several sizes (.webp) so phones download
  small versions.
- If you edit css/style.css, change the ?v=20261120 number in the pages'
  <head> so browsers pick up the new version.
