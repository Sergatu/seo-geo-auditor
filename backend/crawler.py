import requests
from bs4 import BeautifulSoup
import json
import os

class SEOGEOCrawler:
    def __init__(self, base_url):
        self.base_url = base_url
        self.pages_data = []
        self.visited_urls = set()

    def crawl(self, url=None):
        if url is None:
            url = self.base_url
        
        if url in self.visited_urls or len(self.visited_urls) > 15: # Limit for prototype
            return
        
        print(f"Crawling: {url}")
        self.visited_urls.add(url)
        
        try:
            response = requests.get(url, timeout=10)
            if response.status_code != 200:
                return
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract basic data
            page_info = {
                "url": url,
                "title": soup.title.string if soup.title else "",
                "meta_description": "",
                "h1": [h.get_text() for h in soup.find_all('h1')],
                "text": soup.get_text(separator=' ', strip=True),
                "internal_links": []
            }
            
            meta_desc = soup.find("meta", attrs={"name": "description"})
            if meta_desc:
                page_info["meta_description"] = meta_desc.get("content", "")

            self.pages_data.append(page_info)

            # Find internal links to follow
            for link in soup.find_all('a', href=True):
                href = link['href']
                if href.startswith('/') or self.base_url in href:
                    full_url = href if href.startswith('http') else f"{self.base_url.rstrip('/')}/{href.lstrip('/')}"
                    if full_url not in self.visited_urls:
                        self.crawl(full_url)

        except Exception as e:
            print(f"Error crawling {url}: {e}")

    def save_raw_data(self, filename="raw_crawl_data.json"):
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.pages_data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    # Test with the target URL
    crawler = SEOGEOCrawler("https://www.latindancepassion.ch")
    crawler.crawl()
    crawler.save_raw_data("projects/seo_audit_tool/backend/temp_crawl.json")
