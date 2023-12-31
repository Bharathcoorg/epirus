import React, { FormEvent, Fragment, KeyboardEvent, useCallback, useEffect, useState } from "react"
import { debounce } from "debounce"

import useSquid from "../../../hooks/useSquid"
import { classNames, stripNonPrintable } from "../../../utils/strings"
import { Transition } from "@headlessui/react"
import { InputLoading } from "../../loading/Loading"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { linkOf, SearchResult, SearchResultOption, SearchResults } from "./SearchResults"

const QUERY = `
query($str: String!, $limit: Int = 5) {
  contracts(where: { id_startsWith: $str }, limit: $limit) {
    id
  }
  accounts(where: { id_startsWith: $str }, limit: $limit) {
    id
    contract {
      id
    }
  }
  contractCodes(where: { id_startsWith: $str }, limit: $limit) {
    id
  }
}
`

const MIN_QUERY_LEN = 4
const DEBOUNCE_MS = 500

const CLEAR_RESULTS = {
  results: [],
  fromSearch: false
}

export default function SearchBox () {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState("")
  const [searchString, setSearchString] = useState("")
  const [result, reexecuteQuery] = useSquid({
    query: QUERY,
    variables: { str: searchString },
    pause: searchString.length < MIN_QUERY_LEN
  })
  const [searchResults, setSearchResults] = useState<SearchResults>(CLEAR_RESULTS)
  const [highlightedItem, setHighlightedItem] = useState(0)
  const [showResults, setShowResults] = useState(false)

  function doSearch (input: string) {
    if (input.length >= MIN_QUERY_LEN) {
      setShowResults(true)
      setSearchString(input)
      reexecuteQuery()
    }
  }

  const deboSearch = useCallback(debounce(doSearch, DEBOUNCE_MS), [])

  useEffect(() => {
    deboSearch(searchInput)
  }, [searchInput])

  useEffect(() => {
    const handleDocumentClick = () => {
      setShowResults(false)
      setSearchResults(CLEAR_RESULTS)
    }

    document.addEventListener("click", handleDocumentClick)
    return () => document.removeEventListener("click", handleDocumentClick)
  }, [])

  useEffect(() => {
    const { fetching, data } = result
    if (!fetching && data) {
      const entriesFound : SearchResult[] = Object.entries(data)
        .map(([type, v]) => (
          (v as any[]).flatMap(data => (
            {
              type,
              data,
              element: <SearchResultOption data={data} type={type} />
            })
          ))).flat()
      setSearchResults({
        results: entriesFound,
        fromSearch: true
      })
    }
  }, [result])

  function clear () {
    setSearchResults(CLEAR_RESULTS)
    setSearchInput("")
    setShowResults(false)
  }

  const handleKeyDown = ({
    index,
    event
  }: {
    index?: number
    event?: KeyboardEvent<HTMLInputElement>
  }) => {
    const { results } = searchResults
    let itemIndex = 0

    const setValues = (index: number) => {
      setHighlightedItem(index)
    }

    if (index !== undefined) {
      setValues(index)
    } else if (event) {
      switch (event.key) {
      case "ArrowUp":
        event.preventDefault()
        itemIndex = highlightedItem > 0 ? highlightedItem - 1 : results.length - 1
        setValues(itemIndex)
        break
      case "ArrowDown":
        event.preventDefault()
        itemIndex = highlightedItem < results.length - 1 ? highlightedItem + 1 : 0
        setValues(itemIndex)
        break
      case "Escape":
        clear()
        break
      case "Enter":
        if (results.length === 0) {
          event.preventDefault()
        }
        doSearch(searchInput)
        break
      default:
        break
      }
    }
  }

  function handleSubmit (event: FormEvent) {
    event.preventDefault()

    const { results } = searchResults

    if (results.length > 0) {
      const to = linkOf(results[highlightedItem])
      navigate(to)
      setHighlightedItem(0)
    }

    clear()
  }

  const { fetching } = result
  const show = fetching || searchResults.fromSearch

  return (
    <div>
      <form data-testid="form-search" className="search" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input type="text"
            id="default-search"
            data-testid="input-search"
            spellCheck={false}
            className="input w-full px-10 text-sm"
            placeholder="Search Accounts, Contracts, ..."
            value={searchInput}
            onChange={event => {
              const str = stripNonPrintable(event.target.value)
              setSearchInput(str)
            }}
            onKeyDown={(event) => handleKeyDown({ event })}
            required />
          {<InputLoading loading={fetching} delay={400}>
            <>
              {searchInput.length > 0 &&
                <div className="flex absolute items-center inset-y-0 right-0 pr-3">
                  <XMarkIcon
                    className="w-5 h-5 cursor-pointer"
                    onClick={clear}
                  />
                </div>
              }
            </>
          </InputLoading>}
        </div>
      </form>
      {showResults &&
      <div className="relative">
        <Transition
          as={Fragment}
          show={show}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className="
            absolute
            z-10
            mt-0
            right-0
            bg-white
            transform
            max-w-screen
            min-w-full
            opacity-100
            shadow
            overflow-hidden
            translate-y-0"
          data-testid="div-results"
          >
            <ul className="flex flex-col p-1 border border-t-0 border-gray-200 divide-y">
              {searchResults.results.length === 0
                ? <li className="py-3 px-4">
                  <span className="text-light">No results for your query</span>
                </li>
                : searchResults.results.map((result, index) => (
                  <li
                    className={classNames(
                      "py-3 px-4 cursor-pointer",
                      highlightedItem === index ? "selected bg-gray-100" : ""
                    )}
                    onMouseEnter={() => setHighlightedItem(index)}
                    key={`result-${index}`}
                    onClick={() => {
                      navigate(linkOf(result))
                      clear()
                    }}
                  >
                    {result.element}
                  </li>
                ))}
            </ul>
          </div>
        </Transition>
      </div>}
    </div>
  )
}
