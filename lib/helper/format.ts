function removeAccents(input: string): string {
  const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ'
  const accentsOut = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn'
  return input
    .split('')
    .map((char, index) => {
      const accentIndex = accents.indexOf(char)
      return accentIndex !== -1 ? accentsOut[accentIndex] : char
    })
    .join('')
}

export function formatFirstName(firstName: string): string {
  return firstName.charAt(0).toUpperCase() + firstName.slice(1)
}

export function formatLastName(lastName: string): string {
  const lastNameParts = lastName.split(' ')
  const formattedLastNameParts = lastNameParts.map((part, index) =>
    index === 0 && lastNameParts.length > 1
      ? part.toLowerCase()
      : part.charAt(0).toUpperCase() + part.slice(1)
  )
  return formattedLastNameParts.join(' ')
}

export function generateUsername(firstName: string, lastName: string): string {
  const lastNameParts = lastName.split(' ')
  const formattedLastName = lastNameParts
    .map((part) => removeAccents(part.toLowerCase()))
    .join('-')
  const formattedFirstName = removeAccents(firstName.toLowerCase())

  return formattedFirstName && formattedLastName
    ? formattedFirstName + '.' + formattedLastName
    : formattedFirstName + formattedLastName
}

export function generateEmail(firstName: string, lastName: string) {
  const username = generateUsername(firstName, lastName)
  const domain = 'uhlhorn.de'
  const email = firstName && lastName ? `${username}@${domain}` : username

  return email
}

export function generateInitials(firstName: string, lastName: string): string {
  const lastNameParts = lastName.split(' ')
  if (lastNameParts.length > 1) {
    return (
      lastNameParts[0].charAt(0).toUpperCase() +
      lastNameParts[1].charAt(0).toUpperCase()
    )
  }
  return (
    firstName.charAt(0).toUpperCase() + lastNameParts[0].charAt(0).toUpperCase()
  )
}
