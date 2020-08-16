exports.shouldUpdateScroll = ({ routerProps: { location } }) => {
  return location.search === "" // Scroll to top only when we're not searching
}
