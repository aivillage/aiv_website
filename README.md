# SETUP
### Running the site locally
I recommend beginning by forking my repository (https://github.com/aivillage/aiv) and then cloning the repository to begin setup locally.  The site should be hosted in the gh-pages branch of the repository to be hosted on GitHub pages.

Once the site is cloned locally, cd into the directory of the site and run ```docker run -p 4000:4000 -v $(pwd):/site bretfisher/jekyll-serve``` and the site should be running locally at localhost:4000/.

# MAINTENANCE 
### Main Pages and Navigation
The main pages of the site can be found in the _"_pages"_ folder as markdown files.  In the YAML front matter of each markdown file I have set a permalink for each page.  These links are then used in the site navigation.  To alter the navigation of the site, change the key/value pairs in "_data/navigation.yml"

### Images and Variables
When linking to images or other files, I recommend using site variables to keep the links changing dynamically between local development and the public site.  For example, {{ site.url }}{{ site.baseurl }}/assets/images/default.jpeg will link to https://yourusername.github.io/yourrepo/ assets/images/default.jpeg  when running on GitHub Pages and https://localhost:4000/yourrepo/ assets/images/default.jpeg  when running locally.

### Posts and Authors
To add new articles to the website, drop the markdown file in the "_posts" folder named in the format "YYYY-MM-DD-title-content.md" so Jekyll can sort the posts by recency.  This will update the posts on the Press page.

Each post has an author tab displayed on the left by default, this can be disabled in the YAML front matter by adding author_profile: false. To assign an author to the article, set author: Author Name in the front matter of the post. Add and edit author information in "_data/authors.yml".  I added some default incomplete author information in that file already, but it needs to be updated.

### Events
To add events, include the event as a markdown file in the "/_events" folder. 
Make sure to include the following in the front-matter of the markdown file:
- the date in the format "YYYY-MM-DD" under "date" 
- short description of the event under "description"
- location in the format "City, State/Country" 

### Leadership Team
To add to the leadership team page, include a markdown file under "_volunteers" in the format "firstname_lastname.md" and a profile picture under "_volunteers/profiles".
Make sure to include the following in the front-matter of the markdown file:
- first name
- last name
- position
- expertise
- affiliation
- profile: filename of the profile picture 
- bio: "true/false"
Add a bio in the body of the markdown file if bio: true.