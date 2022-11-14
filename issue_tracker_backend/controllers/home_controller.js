module.exports.home = function (req, res) {
  try {
    return res.json({ data: ["one", "two", "three"] });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};  
