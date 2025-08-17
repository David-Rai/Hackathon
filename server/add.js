import axios from 'axios'

export const users = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "Password123!",
    image_url: "https://i.pinimg.com/736x/be/a3/49/bea3491915571d34a026753f4a872000.jpg"
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    password: "SecurePass456@",
    image_url: "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
  },
  {
    name: "Carol Lee",
    email: "carol.lee@example.com",
    password: "MyPass789#",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
  },
  {
    name: "David Brown",
    email: "david.brown@example.com",
    password: "PassWord321$",
    image_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
  },
  {
    name: "Eva Green",
    email: "eva.green@example.com",
    password: "GreenPass654%",
    image_url: "https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
  },
  {
    name: "Frank Wright",
    email: "frank.wright@example.com",
    password: "FranklySecure987^",
    image_url: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Grace Hall",
    email: "grace.hall@example.com",
    password: "GracefulPass741&",
    image_url: "https://plus.unsplash.com/premium_photo-1690086519096-0594592709d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Hank Miller",
    email: "hank.miller@example.com",
    password: "MillerStrong852*",
    image_url: "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Ivy Turner",
    email: "ivy.turner@example.com",
    password: "IvyLeaf963(",
    image_url: "https://images.unsplash.com/photo-1496361001419-80f0d1be777a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Jack Wilson",
    email: "jack.wilson@example.com",
    password: "JackPass159)",
    image_url: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  }
];


