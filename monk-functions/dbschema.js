const db = {
  screams: [
    {
      userHandle: 'user',
      body: 'this is a body',
      createdAt: '2021-02-16T22:02:58.705Z',
      likeCount: 5,
      commentCount: 2
    }
  ],
  userDetails: {
    credentials: {
      userId,
      email,
      handle,
      createdAt,
      imageUrl,
      bio,
      website,
      location
    },
    likes: [
      {
        userHandle,
        screamId
      }
    ]
  }
}