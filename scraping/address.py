from urllib import urlopen as uReq
from bs4 import BeautifulSoup as soup
import re
import csv
import json


my_url = 'https://www.zillow.com/browse/homes/ca/los-angeles-county/91011/0/'
#'https://www.zillow.com/browse/homes/ca/los-angeles-county/91011/'

# opening up connection, grabbing the page
uClient = uReq(my_url)
# "offloads the content into a variable"
page_html = uClient.read()
#uClient.close()

#print(page_html)

#html parsing
soup = soup(page_html, "html.parser")
containers = soup.find_all("tr", {"class":"genus_tr"})
#print(soup)

for info in soup.find_all('h1'):
    	print(info.text)

'''
uniprotDict = {}

for tag in containers:
	uniprot = ""
	my_url = ""
	if tag.find("td", {"class":"uniprot"}) != None:

		# Find the uniprot ID
		uniprot = str(tag.find("td", {"class":"uniprot"}).find("a")['href']).split("/")[-1]


		# Find the url link associated with the uniprot
		my_url = str(tag.find("td", {"class":"uniprot"}).find("a")['href'])
		#uniprotDict.update( {uniprot : my_url })

	if tag.find("td", {"class":"genus_no_td"}) != None:

		# Find the "subfamily" which is a heirarchy string such as 1.2.1.3.1
		subfamily = str(tag.find("td", {"class":"genus_no_td"}).contents[0])
		print(subfamily)
		
		if subfamily[0] != "<":
			uniprotDict.update( {uniprot : [subfamily, my_url]} )
		else:
			subfamily = subfamily.split("\"")[1]
			uniprotDict.update( {uniprot : [subfamily, my_url]} )
		

categories = []
for key, value in uniprotDict.items():
	if value not in categories:
		categories.append(value)

#print(categories)

print(uniprotDict)

# Grab the existing format to keep the uniprots in order
with open('uniprotNew.csv', mode='r') as infile:
	counter = 0
	for row in infile:
		textName = str(row.split(",")[0])
		uniprot = str(row.split(",")[1]).rstrip()
		try:
			uniprotDict.update( {uniprot : uniprotDict[uniprot][0] + "," + textName + "," + uniprotDict[uniprot][1]} )
		except KeyError:
			print(uniprot)


print(uniprotDict)
#print(len(uniprotDict))




with open('uniprotUpdated.csv', 'w') as f:
    for key in uniprotDict.keys():
       f.write("%s,%s\n"%(key,uniprotDict[key]))

'''