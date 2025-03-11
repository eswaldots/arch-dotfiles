import AgeInput from "@/components/inputs/age-input";
import Input from "@/components/inputs/input";
import PhotoPicker from "@/components/inputs/photo-picker";
import Select from "@/components/select";
import SelectItem from "@/components/select/select-item";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMultiStepForm } from "../-context/multi-step-form-context";
import {
  INPUT_BANK_ACCOUNT_VALIDATION,
  INPUT_CI_VALIDATION,
  INPUT_DATE_ERROR_MESSAGE,
  INPUT_HOMELAND_CI_VALIDATION,
  INPUT_PASSPORT_VALIDATION,
  INPUT_PHOTO_ERROR_MESSAGE,
  INPUT_SELECT_ERROR_MESSAGE,
  INPUT_STRING_ERROR_MESSAGE
} from "../-constants";
import CISelect from "@/components/ci-select";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/repein-personal/personals/"
)({
  component: RouteComponent
});

function RouteComponent() {
  const { control, register, errors, setValue} = useMultiStepForm();

  return (
    <form id="file-form" className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Persona de Interes</h1>

      <section className="flex flex-col gap-5 w-full">
        <h3 className="text-lg font-semibold -mb-2">
          Datos Personales Conocidos
        </h3>
        <section className="flex gap-4 items-center justify-between">
          <section className="flex font-normal text-sm text-neutral-500 flex-col w-full gap-1">
            <h3 className="pb-3">Foto Frente</h3>
            <PhotoPicker
              rules={{ required: INPUT_PHOTO_ERROR_MESSAGE }}
              errors={errors}
              name="personal_front_photo"
              control={control}
            />
          </section>
          <section className="flex font-normal text-sm text-neutral-500 flex-col w-full gap-1">
            <h3 className="pb-3">Foto Perfil</h3>
            <PhotoPicker
              rules={{ required: INPUT_PHOTO_ERROR_MESSAGE }}
              errors={errors}
              name="personal_back_photo"
              control={control}
            />
          </section>
        </section>
        <CISelect
          errors={errors}
          rules={{
            required: INPUT_STRING_ERROR_MESSAGE,
            ...INPUT_CI_VALIDATION
          }}
          control={control}
          name="personal_ci"
          label="Cédula de Identidad"
        />
        <Input
          errors={errors}
          register={register("personal_passport", {
            required: INPUT_STRING_ERROR_MESSAGE,
            ...INPUT_PASSPORT_VALIDATION
          })}
          label="N° Pasaporte"
        />
        <AgeInput
          type="expiration"
          register={register("personal_passport_expiration", {
            required: INPUT_DATE_ERROR_MESSAGE
          })}
          register_age={register("personal_passport_years_valid", {
            required: INPUT_DATE_ERROR_MESSAGE
          })}
          onChangeAge={(age) => { setValue("personal_passport_years_valid", age) }}
          errors={errors}
          name="personal_passport_expiration"
          nameAge="personal_passport_years_valid"
          label="Fecha de Vencimiento"
          labelAge="Años Vigente"
          defaultValueAge={control._defaultValues?.repein_personal_passport_years_valid?.toString()}
        />
      </section>

      <section className="flex flex-col gap-5 justify-between w-full">
        <h3 className="text-lg font-semibold -mb-2">Información Básica</h3>
        <section className="flex gap-3 items-center justify-between">
          <Input
            errors={errors}
            register={register("personal_name", {
              required: INPUT_STRING_ERROR_MESSAGE
            })}
            name="personal_name"
            label="Nombres"
          />
          <Input
            errors={errors}
            register={register("personal_surnames", {
              required: INPUT_STRING_ERROR_MESSAGE
            })}
            name="personal_surnames"
            label="Apellidos"
          />
          <Input
            errors={errors}
            register={register("personal_nicknames", {
              required: INPUT_STRING_ERROR_MESSAGE
            })}
            name="personal_nicknames"
            label="Apodos"
          />
        </section>
        <AgeInput
          register={register("personal_birthday", {
            required: INPUT_DATE_ERROR_MESSAGE
          })}
          register_age={register("personal_age", {
            required: INPUT_DATE_ERROR_MESSAGE,
            min: 0
          })}
          errors={errors}
          name="personal_birthday"
          label="Fecha de Nacimiento"
          nameAge="personal_age"
          onChangeAge={(age) => { setValue("personal_age", age) }}
          defaultValueAge={control._defaultValues?.repein_personal_age?.toString()}
        />

        <Input
          errors={errors}
          register={register("personal_birthplace", {
            required: INPUT_STRING_ERROR_MESSAGE
          })}
          name="personal_birthplace"
          label="Lugar de Nacimiento"
        />
      </section>

      <section className="flex flex-col gap-5 justify-between w-full">
        <h3 className="text-lg font-semibold -mb-2">Información Conocida</h3>
        <Input
          errors={errors}
          register={register("personal_address", {
            required: INPUT_STRING_ERROR_MESSAGE
          })}
          name="personal_address"
          label="Dirección"
        />
        <Input
          errors={errors}
          register={register("personal_phone", {
            required: INPUT_STRING_ERROR_MESSAGE
          })}
          name="personal_phone"
          label="Teléfono"
        />
        <Input
          errors={errors}
          register={register("personal_coordinates", {
            required: INPUT_STRING_ERROR_MESSAGE
          })}
          name="personal_coordinates"
          label="Coordenadas"
        />
      </section>

      <section className="flex flex-col gap-5 justify-between w-full">
        <h3 className="text-lg font-semibold -mb-2">Información Adicional</h3>
        <section className="flex gap-3 items-center justify-between">
          <div className="w-96">
            <Select
              control={control}
              rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
              errors={errors}
              name="personal_gender"
              label="Genero"
            >
              <SelectItem value="male">Masculino</SelectItem>
              <SelectItem value="female">Femenino</SelectItem>
            </Select>
          </div>
          <div className="w-full">
            <Select
              control={control}
              rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
              errors={errors}
              name="personal_state_civil"
              label="Estado civil"
            >
              <SelectItem value="married">Soltero</SelectItem>
              <SelectItem value="single">Casado</SelectItem>
              <SelectItem value="single">Divorciado</SelectItem>
              <SelectItem value="single">Viudo</SelectItem>
            </Select>
          </div>
        </section>
        <Select
          control={control}
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          errors={errors}
          name="personal_licenses"
          label="Licencia de Conducir"
        >
          <SelectItem value="primary">2° Grado (Motos)</SelectItem>
          <SelectItem value="secundary">
            3° Grado (Vehiculos Livianos)
          </SelectItem>
          <SelectItem value="secundary">4° Grado (Autobuses)</SelectItem>
          <SelectItem value="secundary">
            5° Grado (Vehiculos Pesados)
          </SelectItem>
        </Select>
        <Input
          errors={errors}
          register={register("personal_homeland_ci", {
            required: INPUT_STRING_ERROR_MESSAGE,
            ...INPUT_HOMELAND_CI_VALIDATION
          })}
          name="personal_homeland_ci"
          label="Carnet de la Patria"
        />
        <Input
          errors={errors}
          register={register("personal_account_bank", {
            required: INPUT_STRING_ERROR_MESSAGE,
            ...INPUT_BANK_ACCOUNT_VALIDATION
          })}
          name="personal_account_bank"
          label="Cuenta Bancaria"
        />
      </section>
      <Link to="/analysis/management/repein-personal/submit">
        Ir al final (debug)
      </Link>
    </form>
  );
}
