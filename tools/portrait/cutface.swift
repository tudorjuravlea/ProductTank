import Foundation
import Vision
import CoreImage
import AppKit
let src = URL(fileURLWithPath: CommandLine.arguments[1]); let dst = URL(fileURLWithPath: CommandLine.arguments[2])
guard let ci = CIImage(contentsOf: src) else { fatalError("no image") }
let seg = VNGeneratePersonSegmentationRequest(); seg.qualityLevel = .accurate; seg.outputPixelFormat = kCVPixelFormatType_OneComponent8
let face = VNDetectFaceRectanglesRequest()
let h = VNImageRequestHandler(ciImage: ci, options: [:]); try h.perform([seg, face])
guard let mask = seg.results?.first?.pixelBuffer else { fatalError("no mask") }
var m = CIImage(cvPixelBuffer: mask); m = m.transformed(by: CGAffineTransform(scaleX: ci.extent.width / m.extent.width, y: ci.extent.height / m.extent.height))
let blend = CIFilter(name: "CIBlendWithMask")!; blend.setValue(ci, forKey: kCIInputImageKey); blend.setValue(CIImage(color: .clear).cropped(to: ci.extent), forKey: kCIInputBackgroundImageKey); blend.setValue(m, forKey: kCIInputMaskImageKey)
let out = blend.outputImage!.cropped(to: ci.extent); let cg = CIContext().createCGImage(out, from: out.extent)!
try NSBitmapImageRep(cgImage: cg).representation(using: .png, properties: [:])!.write(to: dst)
let W = ci.extent.width, H = ci.extent.height
if let f = face.results?.max(by: { $0.boundingBox.width < $1.boundingBox.width })?.boundingBox {
  print("face", Int(f.minX * W), Int((1 - f.maxY) * H), Int(f.width * W), Int(f.height * H))
} else { print("face none") }
