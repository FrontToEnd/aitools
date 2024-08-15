'use server'

import supabase from '@/lib/supabase'
import {handleGetEmbedding} from "@/app/utils";

async function embeddingSearch(search:string) {
  try {
    const embedding = await handleGetEmbedding(search)
    if (!embedding) return [];

    const { error: matchError, data: embeddingItems } = await supabase.rpc(
        'match_items',
        {
          query_embedding: embedding,
          match_threshold: 0,  // Fill in an appropriate value based on your requirements
          match_count: 10,  // Fill in an appropriate value based on your requirements
        }
    );

    if (matchError) {
      return [];
    } else {
      return embeddingItems;
    }
  } catch (error) {
    return [];
  }
}

async function ftsSearch(search:string) {
  const { error: matchError, data: FTSitems } = await supabase.rpc(
      'fts_match_items_ranked', {
        query_string: search.replace(/ /g, ' & '),  // Modify the query string as needed
        match_count: 10,  // Fill in an appropriate value based on your requirements
      })
  if (matchError) {
    return [];
  } else {
    return FTSitems;
  }
}

function asyncFunctionWithTimeout(asyncFunction: (...args: any[]) => Promise<any>, timeout:number, ...args :any[]) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Async function timed out'));
    }, timeout);
  });

  return Promise.race([asyncFunction(...args), timeoutPromise]);
}

function dedupeSortedItemsByDomain(sortedItems: any[]): any[] {
  const uniqueDomains = new Set();
  return sortedItems.filter((item) => {
    const url = new URL(item.url);
    const domain = url.hostname;
    if (uniqueDomains.has(domain)) {
      return false;
    } else {
      uniqueDomains.add(domain);
      return true;
    }
  });
}

function normalizeSearch(search:string) {
  let result = search.substring(0, 256).replace(/[\p{P}\p{S}]/gu, ' ').toLowerCase();
  result = result.trim().replace(/\s+/g, ' ');
  return result;
}


export async function handleSearch(
    search: string
) {
  if (search.trim() === '') {
    return []
  }

  const normalizedSearch = normalizeSearch(search);

  const [embeddingResult, ftsResult] = await Promise.allSettled([
    asyncFunctionWithTimeout(embeddingSearch, 5000, normalizedSearch),
    asyncFunctionWithTimeout(ftsSearch, 5000, normalizedSearch),
  ]);

  const embeddingItems = embeddingResult.status === 'fulfilled' ? embeddingResult.value : [];
  const FTSitems = ftsResult.status === 'fulfilled' ? ftsResult.value : [];


  const mergedItemsMap = new Map();

  embeddingItems.forEach((item:any) => {
    mergedItemsMap.set(item.url, { ...item});
  });

  FTSitems.forEach((item:any) => {
    if (mergedItemsMap.has(item.url)) {
      const existingItem = mergedItemsMap.get(item.url);
      const updatedItem = { ...existingItem, rank: item.rank };
      mergedItemsMap.set(item.url, updatedItem);
    } else {
      mergedItemsMap.set(item.url, { ...item });
    }
  });

  const dedupedSortedItems = dedupeSortedItemsByDomain(Array.from(mergedItemsMap.values()));
  return dedupedSortedItems.slice(0, 100);

};
