function pagination(
    pagination,
    containerId,
    pageInfoId,
    prevClass,
    nextClass,
    callback = () => { }
) {
    const contenedorPaginacion = document.getElementById(containerId);
    const totalCount = pagination.total;
    const currentPage = pagination.current_page;
    const perPage = pagination.per_page;

    // Calcular el rango de registros que se están mostrando
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(start + perPage - 1, totalCount);

    const pageInfo = `Mostrando ${start} - ${end} de ${totalCount} registros`;
    document.getElementById(pageInfoId).textContent = pageInfo;

    let html = "";
    if (pagination.last_page > 1) {
        html += `
                <button class="btn-sm ${prevClass} page-link" ${!pagination.prev_page_url ? "disabled" : ""
            }><i class="bi bi-chevron-left"></i></button>
            `;
        html += `
                <span class="mx-2">Página ${pagination.current_page} de ${pagination.last_page}</span>
            `;
        html += `
                <button class="btn-sm ${nextClass} page-link" ${!pagination.next_page_url ? "disabled" : ""
            }><i class="bi bi-chevron-right"></i></button>
            `;
    }

    contenedorPaginacion.innerHTML = html;

    // Agregar eventos para los botones de paginación
    document.querySelector(`.${prevClass}`)?.addEventListener("click", () => {
        if (pagination.prev_page_url) {
            callback(currentPage - 1);
        }
    });

    document.querySelector(`.${nextClass}`)?.addEventListener("click", () => {
        if (pagination.next_page_url) {
            callback(currentPage + 1);
        }
    });
}

function clearValidationErrors() {
    document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-control, .form-select').forEach(el => el.classList.remove('is-invalid'));
}

function handleValidationErrors(errors) {
    for (const [field, messages] of Object.entries(errors)) {
        const input = document.getElementById(field);
        if (input) {
            input.classList.add('is-invalid');
            const errorDiv = document.getElementById(`${field}Error`);
            if (errorDiv) errorDiv.textContent = messages.join(', ');
        }
    }
}

function clearFieldError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = document.getElementById(`${input.id}Error`);
    if (errorDiv) errorDiv.textContent = '';
}


function disableButtonWithLoader(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = true;
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...`;
    }
}

function enableButtonWithLoader(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = false;
        button.innerHTML = 'Enviar';
    }
}

function showToast(message) {
    toastr.options = {
        closeButton: true,
        progressBar: true,
        timeOut: 5000,
        extendedTimeOut: 5000,
        tapToDismiss: false,
        preventDuplicates: true,
        positionClass: 'toast-top-right',
        toastClass: 'custom-toast',
    };
    toastr.info(message);
}
