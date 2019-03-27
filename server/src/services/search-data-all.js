const searchDataAll = async (getDataFunc) => {
  let totalHits = 0
  let total = 0
  let sources = []

  do {
    const {
      listData,
      total: _total
    } = await getDataFunc

    totalHits = totalHits + listData.length
    total = _total

    sources = [
      ...sources,
      ...listData.map(({ _source }) => _source)
    ]
  } while (totalHits < total)

  return sources
}

export default searchDataAll
