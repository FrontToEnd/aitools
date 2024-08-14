'use client'

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/command'
import { SetStateAction, useEffect, useState} from 'react'
import {useDebounce} from 'use-debounce'
import Image from 'next/image'

// @ts-ignore
export function Search({searchPokedex}) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [debouncedQuery] = useDebounce(query, 150)
  useEffect(() => {
    let current = true
    if (debouncedQuery.trim().length > 0) {
      setSearchResults([])
      setLoading(true)
      searchPokedex(debouncedQuery).then((results: SetStateAction<any[]>) => {
        if (current) {
          setLoading(false)
          setSearchResults(results)
        }
      })
    } else {
      setSearchResults([])
      setLoading(false)
    }
    return () => {
      current = false
    }
  }, [debouncedQuery, searchPokedex])

  return (
    <div className="w-full">
      <Command label="Command Menu" shouldFilter={false}>
        <CommandInput
          id="search"
          placeholder="Search anything"
          className="focus:ring-0 sm:text-sm text-base focus:border-0 border-0 active:ring-0 active:border-0 ring-0 outline-0"
          value={query}
          onValueChange={(q) => setQuery(q)}
        />
        <CommandList>
          <CommandEmpty className="h-[350px] flex items-center justify-center">
            {
              loading ? (
                  <span className="loading loading-ring loading-lg"></span>
              ) : 'No results found'
            }
          </CommandEmpty>
          {searchResults.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener dofollow">
                <CommandItem
                    key={item.id}
                    value={item.title}
                    className="flex items-center justify-between py-3 h-16"
                >
                  <div className="flex space-x-4 w-11/12">
                    <Image
                        width={40}
                        height={40}
                        className="bg-gray-300 rounded-full aspect-square h-10 w-10"
                        src={item.logo ? `${item.id}` : '/logo.png'}
                        alt={item.title}
                    ></Image>
                    <div className="space-y-1 flex flex-col w-10/12">
                      <p className="text-sm text-gray-800">
                        {item.title.substring(0, 90)}
                      </p>
                      <p className="text-sm text-gray-800 truncate">
                        {item.brief ? item.brief : 'No description'}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-800">
                    {item.similarity ? (
                        <div className="text-xs font-mono p-0.5 rounded bg-zinc-100">
                          {item.similarity.toFixed(3)}
                        </div>
                    ) : (
                        <div />
                    )}
                  </div>
                </CommandItem>
              </a>
          ))}
        </CommandList>
      </Command>
    </div>
  )
}

Search.displayName = 'Search'
