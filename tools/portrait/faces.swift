import Foundation
import Vision
import CoreImage
// prints: file w h then one line per face: x y w h (top-left pixels, after EXIF orientation)
for path in CommandLine.arguments.dropFirst() {
  let url = URL(fileURLWithPath: path)
  guard let ci = CIImage(contentsOf: url, options: [.applyOrientationProperty: true]) else { continue }
  let req = VNDetectFaceRectanglesRequest()
  try? VNImageRequestHandler(ciImage: ci, options: [:]).perform([req])
  let W = ci.extent.width, H = ci.extent.height
  var line = "\(url.lastPathComponent) \(Int(W)) \(Int(H))"
  for f in (req.results ?? []) { let b = f.boundingBox; line += " | \(Int(b.minX*W)) \(Int((1-b.maxY)*H)) \(Int(b.width*W)) \(Int(b.height*H))" }
  print(line)
}
