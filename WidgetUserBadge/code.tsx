const { widget } = figma
const { AutoLayout, Image, Rectangle, Text, useSyncedState, usePropertyMenu, useEffect } = widget

function UserBadge() {
  const [showName, setShowName] = useSyncedState<boolean>('showName', true)
  const [name, setName] = useSyncedState<string>('name', "")
  const [photoUrl, setPhotoUrl] = useSyncedState<string | null>('photoUrl', null)

  useEffect(() => {
    if (!name) {
      if (figma.currentUser) {
        setName(figma.currentUser.name)
        setPhotoUrl(figma.currentUser.photoUrl)
      } else {
        figma.notify("Please login to figma")
      }
    }
  })

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
        {photoUrl ? (
          <Image cornerRadius={6} width={30} height={30} src={photoUrl} />
        ) : (
          <Rectangle cornerRadius={6} width={30} height={30} fill="#2A2A2A" />
        )}
        {showName && (
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="center"
            verticalAlignItems="center"
            height="hug-contents"
            padding={4}
          >
            <Text fontSize={16}>{name}</Text>
          </AutoLayout>
        )}
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(UserBadge)
