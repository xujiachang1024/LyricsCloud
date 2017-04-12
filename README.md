# csci310_Spring_P1
This is the repository of CSCI310_spring2017_project1_team #6

Here is the run instruction.

In Virtualbox, go to “File -> Import Appliance” in the menu bar. Click the “Open Appliance” button to select your OVA file. Once you have selected the file, click “Next”. Scroll through the configuration list and click “import” Select the new VM in your list and click green arrow “show”.

Before running the program, it's best for user experience to set VM with 2 CPUs and 4096 MB memory. Make sure the internet connection is stable. 

Open Google Chrome, type in the website "http://localhost.com" and hit ENTER. 

You will be navigated to our webpage.

Click at the search box and then enter an artist name in the search box. You will see a dropdown list with some autocomplete suggestion names.

Click on the "search" button and it will take about 20 to 30 seconds to get accurate results. Please wait patiently. 

Shortly after, you will see a beautiful lyrics cloud with all the keywords about the artist. Also "share" button and "add" button will appear at the bottom of the website.

Erase the search box and type in another artist name. And then click the "add" button. It again will cost 20 to 30 seconds to generate the lyrics cloud. But this lyrics cloud is generated from both artists' song lyrics. 

If you click any word in the lyrics cloud, it opens a new tab with a list of songs and a list of frequencies that associate with songs. We name this page the second page.

On the second page, you can click on a "back" button. It will close the current page and show you the first page.
On the second page, each of the song title on the second page is clickable and it opens another tab with 30% of the lyrics of that song. Also the word that you clicked on the first page is highlighted whereever it appears in the lyrics. We name this page the third page. We apologize for the limited results becaue Musixmatch API that we use only provides 30% of lyrics for free.

On the second page, you may see some duplicated song names and that's normal. An artist could produce a song repeatedly. 

On the third page, clicking "back to song list page" button will close itself and show the song list page. Clicking "back to the world cloud page" will close everything and leave only the first page. 
