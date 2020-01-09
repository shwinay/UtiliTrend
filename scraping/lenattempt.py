import bs4 as bs
from urllib import urlopen 
import csv

# url = input("Enter the url: ") 
# filename = input("Enter the file name. Don't forget to add .csv at the end: ")

url = 'https://www.zillow.com/browse/homes/ca/los-angeles-county/91011/0/'
filename = 'test.csv'

uClient = uReq(my_url)
# "offloads the content into a variable"
page_html = uClient.read()
uClient.close()

#print(page_html)

#html parsing
soup = soup(page_html, "html.parser")
containers = soup.find_all("tr", {"class":"genus_tr"})
print(soup)

'''
csv_file = open('test.csv', 'w')
csv_writer = csv.writer(csv_file, lineterminator = '\n')
csv_writer.writerow(['Address','Home','Away'])
'''

for info in soup.find_all('li'):
    print(info.text)

#csv_file.close() 