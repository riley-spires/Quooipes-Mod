function renderBox(color, x, y, z, thickness = 5) {
    // Bottom face
    Renderer3d.drawLine(color, x, y, z, x + 1, y, z, 5);
    Renderer3d.drawLine(color, x, y, z, x, y, z + 1, 5);
    Renderer3d.drawLine(color, x + 1, y, z + 1, x + 1, y, z, 5);
    Renderer3d.drawLine(color, x + 1, y, z + 1, x, y, z + 1, 5);

    // Legs
    Renderer3d.drawLine(color, x, y, z, x, y + 1, z, 5);
    Renderer3d.drawLine(color, x + 1, y, z, x + 1, y + 1, z, 5);
    Renderer3d.drawLine(color, x, y, z + 1, x, y + 1, z + 1, 5);
    Renderer3d.drawLine(color, x + 1, y, z + 1, x + 1, y + 1, z + 1, 5);


    // Top Face
    Renderer3d.drawLine(color, x, y + 1, z, x + 1, y + 1, z, 5);
    Renderer3d.drawLine(color, x, y + 1, z, x, y + 1, z + 1, 5);
    Renderer3d.drawLine(color, x + 1, y + 1, z + 1, x + 1, y + 1, z, 5);
    Renderer3d.drawLine(color, x + 1, y + 1, z + 1, x, y + 1, z + 1, 5);
}

export default renderBox;
