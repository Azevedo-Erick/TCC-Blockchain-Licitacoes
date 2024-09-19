using System.ComponentModel.DataAnnotations;

namespace TCC_Blockchain.Dtos;

public class CriarLicitacaoDto
    {
        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Titulo { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 1)]
        public string Descricao { get; set; }

      /*   [Required]
        [RegularExpression(@"^[0-9A-Fa-f]{32}$", ErrorMessage = "O HashETP deve ter 32 caracteres hexadecimais.")]
        public string HashETP { get; set; }

        [Required]
        [RegularExpression(@"^[0-9A-Fa-f]{32}$", ErrorMessage = "O HashEdital deve ter 32 caracteres hexadecimais.")]
        public string HashEdital { get; set; } */

        [Required]
        public DateTime DataInicio { get; set; } = new DateTime();

        public IFormFile ETP {get;set;}
        public IFormFile Edital {get;set;}

    }
