# Web Scraping Chrome Extension: Grade Organizer

![Grade Organizer](/path/to/grade-organizer.png)

## Overview

The Grade Organizer is a Chrome extension designed to assist teachers in efficiently organizing and managing student grades scraped from various sources. It provides a user-friendly interface for teachers to rearrange and categorize grades according to their preferences, streamlining the grading process and enhancing productivity.

## Features

- **Web Scraping**: Automatically fetches student grades from specified websites or platforms.
- **Grade Reorganization**: Allows teachers to rearrange grades based on custom criteria or preferences.
- **Flexible Categorization**: Enables categorization of grades into buckets or competencies for better organization and analysis.
- **Efficient Sorting**: Provides sorting options to easily manage and prioritize grades.
- **User-friendly Interface**: Intuitive interface with drag-and-drop functionality for seamless grade manipulation.
- **Chrome Extension**: Conveniently integrates with Chrome browser for easy access and usability.



Flow chart of the Data transfer:
![image](https://github.com/Joenuhhh/ChromeExtension/assets/79020295/b73b3609-c1b9-4f18-a8c4-455c6552b92d)

Logical Solution Design:
![image](https://github.com/Joenuhhh/ChromeExtension/assets/79020295/837c5c54-8d0b-43d1-823f-a019d4e057e0)

Setting Definitions for buckets and competencies:
Buckets and competencies (Groups of grades organized for weighted grading) can be of variable length, so rather than making constructors for every possible variation, we attach a Bucket and Competency Variable to the Teacher class that’s stored in a Chrome storage tools. This allows a teacher to choose their current Number of Buckets, and the number of competencies within them and then other portions that rely on those numbers will have figures to draw from. Here is a visual depiction for what buckets and competencies look like:

![image](https://github.com/Joenuhhh/ChromeExtension/assets/79020295/f4b1a32d-51b5-4322-8937-cfa6b5880af3)




How we can manage these buckets of variable size:

![image](https://github.com/Joenuhhh/ChromeExtension/assets/79020295/4246f61b-6a5d-4406-bef5-dffaaa1b80db)

![image](https://github.com/Joenuhhh/ChromeExtension/assets/79020295/1aee9fcd-476b-4bc8-a93d-101f570612a9)

## Installation

1. Clone the repository:

```bash
[git clone https://github.com/Joenuhhh/ChromeExtension)https://github.com/Joenuhhh/ChromeExtension]
