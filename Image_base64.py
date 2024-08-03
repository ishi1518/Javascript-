import base64
import os

def convert_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        base64_string = base64.b64encode(image_file.read()).decode('utf-8')
    return base64_string

def convert_images_in_directory_to_js(directory_path, output_js_file):
    base64_strings = {}
    for filename in os.listdir(directory_path):
        if filename.endswith(".png"):
            file_path = os.path.join(directory_path, filename)
            file_key = os.path.splitext(filename)[0]  # Remove the file extension
            base64_strings[file_key] = convert_image_to_base64(file_path)

    with open(output_js_file, 'w') as js_file:
        js_file.write('const images = {\n')
        for file_key, base64_string in base64_strings.items():
            js_file.write(f'    "{file_key}": "data:image/png;base64,{base64_string}",\n')
        js_file.write('};\n')
        js_file.write('export default images;\n')

if __name__ == "__main__":
    # Get the directory where the script is located
    directory_path = os.path.dirname(os.path.abspath(__file__))
    output_js_file = os.path.join(directory_path, 'images64.js')
    convert_images_in_directory_to_js(directory_path, output_js_file)
    
print('Images converted to Base64 and saved in image.js without extensions')