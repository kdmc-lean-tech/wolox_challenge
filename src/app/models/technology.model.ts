
export interface Technology {
  tech: string;
  year: string;
  author: string;
  license: string;
  language: string;
  type: string;
  logo: string;
}

export interface SortTechnology {
  label: string;
  value: string;
}

export type TypeTechnology = 'tech' | 'author' | 'license' | 'language' | 'type' ;
