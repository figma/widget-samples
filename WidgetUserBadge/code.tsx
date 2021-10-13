const { widget } = figma
const { AutoLayout, Image, Text, useSyncedState, usePropertyMenu } = widget

function UserBadge() {
  const [showName, setShowName] = useSyncedState('showName', true)
  usePropertyMenu(
    [
      {
        itemType: 'action',
        tooltip: 'Toggle name',
        propertyName: 'toggleName',
      },
    ],
    () => {
      setShowName(!showName)
    },
  )

  return (
    <AutoLayout
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={4}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={6}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.2 },
        offset: { x: 0, y: 0 },
        blur: 2,
        spread: 2,
      }}
    >
      <AutoLayout
        direction="horizontal"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        height="hug-contents"
        padding={5}
        fill="#E6E6E6"
        cornerRadius={8}
      >
        <Image cornerRadius={6} width={30} height={30} src={figma.currentUser.photoUrl} />
        {showName && (
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="center"
            verticalAlignItems="center"
            height="hug-contents"
            padding={4}
            fill={null}
          >
            <Text fontSize={16}>{figma.currentUser.name}</Text>
          </AutoLayout>
        )}
      </AutoLayout>
    </AutoLayout>
  )
}
widget.register(UserBadge)
