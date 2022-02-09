# Developer Portal Setup

The developer portal is built using Jekyll and runs on GitHub Pages.  More information can be found at: <a href="https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll">Testing your GitHub Pages site locally with Jekyll</a>

## Prerequisites:
1. Ensure you have [rbenv](https://github.com/rbenv/rbenv) (a tool for managing separate copies of Ruby for different projects) installed and setup (on macOS, you can install with Homebrew: `brew install rbenv`). Be sure to set up your PATH and environment afterwards as per instructions given by `rbenv init`.
2. In the directory of your clone of this repo: `rbenv install`. That will ensure you have the correct version of Ruby available for this repo.
3. Ensure Bundler is installed for this particular version of ruby: `gem install jekyll bundler`.
  
## Instructions:
  1. Navigate to the base of this repo
  2. Run `bundle install`.  This will install all the required gems to run the site.
  3. Run `bundle exec jekyll serve`. This will run the local version of the site, usually at http://127.0.0.1:4000/developer/.  The output from the terminal command will show where it is running locally on your system.

