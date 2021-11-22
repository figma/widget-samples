const { widget } = figma
const { AutoLayout, SVG, Text, useSyncedMap, usePropertyMenu } = widget

const buttonSrc = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="15.5" stroke="black" stroke-opacity="0.1" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 8H15V15H8V17H15V24H17V17H24V15H17V8Z" fill="black" fill-opacity="0.8"/>
  </svg>
`

function Counter() {
  const votesMap = useSyncedMap<number>('votes')
  const numVotes = votesMap.values().reduce((acc, x) => acc + x, 0)
  const voteKey = String(figma.activeUsers[0].sessionId)

  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      tooltip: 'Increment',
      propertyName: 'increment',
      itemType: 'action',
    },
  ]
  if (numVotes > 0) {
    propertyMenu.push({
      tooltip: 'Decrement',
      propertyName: 'decrement',
      itemType: 'action',
    })
  }
  propertyMenu.push({
    tooltip: 'Reset',
    propertyName: 'reset',
    itemType: 'action',
  })

  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    if (propertyName === 'decrement') {
      votesMap.set(voteKey, (votesMap.get(voteKey) || 0) - 1)
    } else if (propertyName === 'increment') {
      votesMap.set(voteKey, (votesMap.get(voteKey) || 0) + 1)
    } else if (propertyName === 'reset') {
      votesMap.keys().forEach((key) => votesMap.delete(key))
    }
  })

  return (
    <AutoLayout
      verticalAlignItems="center"
      padding={{ left: 16, right: 8, top: 8, bottom: 8 }}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={12}
      strokeWidth={3}
      stroke={{
        type: 'solid',
        color: '#123456',
      }}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.2 },
        offset: { x: 0, y: 0 },
        blur: 2,
        spread: 2,
      }}
    >
      <SVG
        src={buttonSrc}
        onClick={() => {
          votesMap.set(voteKey, (votesMap.get(voteKey) || 0) + 1)
        }}
      />
      <AutoLayout
        verticalAlignItems="center"
        height="hug-contents"
        padding={{ left: 24, right: 24, top: 12, bottom: 12 }}
        fill="#E6E6E6"
        cornerRadius={8}
      >
        <Text fontSize={32} horizontalAlignText="center">
          {numVotes}
        </Text>
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(Counter)
