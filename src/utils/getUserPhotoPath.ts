export const getUserPhotoPath = (id: string) => ({
    method: 'get',
    url: `https://api.telegram.org/bot6563010085:AAGyH_HZD-zLcNugzfucST9AC63yFtPt6gA/getFile?file_id=${id}`,
    headers: {}
})
