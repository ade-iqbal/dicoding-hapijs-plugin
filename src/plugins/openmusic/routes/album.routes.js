const routes = (controller) => [
  {
    method: "POST",
    path: "/albums",
    handler: controller.addAlbumController,
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: controller.getAlbumByIdController,
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: controller.updateAlbumController,
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: controller.deleteAlbumController,
  },
];

module.exports = routes;
