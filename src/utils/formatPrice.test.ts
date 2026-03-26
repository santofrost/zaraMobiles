import { formatPrice } from "./formatPrice";

describe("formatPrice utility", () => {
  // Nota: JavaScript Intl.NumberFormat a veces produce espacios irrompibles (NBSP) o diferencias menores
  // en la representación de moneda dependiendo del entorno (NodeJS vs navegador).
  // Usamos toMatch para hacerlo resiliente a pequeños espacios en blanco.

  it("debería formatear 0 correctamente", () => {
    const result = formatPrice(0);
    expect(result).toMatch(/0,00\s?€/);
  });

  it("debería formatear números enteros con separador de miles", () => {
    const result = formatPrice(1500);
    expect(result).toMatch(/1\.500,00\s?€/);
  });

  it("debería formatear números con decimales correctamente", () => {
    const result = formatPrice(1234.56);
    expect(result).toMatch(/1\.234,56\s?€/);
  });
});
