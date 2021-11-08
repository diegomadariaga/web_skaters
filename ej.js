function arreglar(nums) {
    const result = [];
    /* const largo = nums.length
    for (let i = 0; i < largo*2; i++) {
        if (!nums[i]) {
            result.push(nums[i-largo]);            
        }
        else {
            result.push(nums[i]);
        }
    }
    return result; */
    /* nums.forEach((num) => {
        result.push(num);
    });
    nums.forEach((num) => {
        result.push(num);
    });
    return result; */
    const largo = nums.length
    for (let i = 0; i < largo; i++) {
        result.push(nums[i]);
    }
    for (let i = 0; i < largo; i++) {
        result.push(nums[i]);
    }
    concat(nums, nums);
    return [].concat(nums, nums);

}
console.log(arreglar([1, 2, 3, 4, 5, 9, 8, 8, 7, 7]));
