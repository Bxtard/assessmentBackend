const { updateUser } = require('../users/user.services');
const {
  getAllFavList,
  getFavList,
  createFavList,
  deleteFavList,
} = require('./favList.services');

/**
 * @openapi
 *  api/favList:
 *    get:
 *      description: get all favList
 *      responses:
 *        200:
 *          description: An array of favLists
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ServerError'
 */
async function getAllFavListHandler(req, res) {
  const favList = await getAllFavList();
  return res.status(200).json(favList);
}
/**
 * @openapi
 *  api/favList:
 *    post:
 *      tags:
 *      - FavList
 *      security:
 *      - bearerAuth: String
 *      description: create a new favList
 *      requestBody:
 *        description: name of the list
 *      content:
 *       application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/request/'
 *      responses:
 *        200:
 *          description: A new favList was created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FavListSchema'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ServerError'
 */
async function createFavListHandler(req, res) {
  const { favList } = req.body;
  const user = req.user;
  const owner = user.id;
  const payload = { ...favList, owner };
  try {
    const newFavList = await createFavList(payload);
    const newUser = await updateUser(owner, {
      $push: { favLists: newFavList.id },
    });
    console.log(
      '[SUCCESS]: a FavList created and User was updated successfully'
    );
    return res.status(200).json(newFavList);
  } catch (error) {
    console.log('[ERROR]: error creating FavList: ' + error);
    return res.status(500).json(error);
  }
}
/**
 * @openapi
 *  api/favList/{id}:
 *    get:
 *      tags:
 *      - FavList
 *      security:
 *      - bearerAuth: String
 *      description: get a single favList
 *      parameters:
 *      - name: id
 *        description: FavList id to delete
 *      responses:
 *        200:
 *          description: A favList
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ServerError'
 */
async function getFavListHandler(req, res) {
  const { id } = req.params;
  try {
    const favList = await getFavList(id);
    return res.status(200).json(favList);
  } catch (error) {
    return res.status(500).json(error);
  }
}
/**
 * @openapi
 *  api/favList/{id}:
 *    delete:
 *      tags:
 *      - FavList
 *      security:
 *      - bearerAuth: String
 *      description: delete a single favList
 *      parameters:
 *      - name: id
 *        description: FavList id to delete
 *      responses:
 *        200:
 *          description: A favList was deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FavListSchema'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ServerError'
 */
async function deleteFavListHandler(req, res) {
  const { id } = req.params;
  try {
    const result = await deleteFavList(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllFavListHandler,
  getFavListHandler,
  createFavListHandler,
  deleteFavListHandler,
};
