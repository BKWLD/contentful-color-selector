# contentful-color-selector

A UI Extension for Contentful that generate a dropdown for selecting a space-wide color selector. A use case for this is for forcing an editor to choose from a set of predefined brand colors.

![](http://yo.bkwld.com/4042840bc4bc/Screen%20Recording%202019-06-06%20at%2007.52%20AM.gif)

You can customize the color options in the Extension settings in Contentful.  Like:

![](http://yo.bkwld.com/43bfbde1ce78/Image%202019-06-06%20at%207.53.56%20AM.png)

## Install

The easiest way to install is from Contentful's "Install from Github" option:

![](http://yo.bkwld.com/04f5323c4e1f/Image%202019-06-06%20at%207.56.16%20AM.png)

Paste this URL into the "GitHub URL" field:

```
https://github.com/BKWLD/contentful-color-selector/blob/master/extension.json
```

## Notes

- I ran into Babel issues ("We noticed you're using the `useBuiltIns` option without declaring a core-js version.") when using Yarn so this project using NPM like found in the Contentful docs.