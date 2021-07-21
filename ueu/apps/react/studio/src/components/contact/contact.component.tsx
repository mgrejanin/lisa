import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { MDCDialog } from '@material/dialog';
import {
    ApolloButton,
    ApolloCheckbox,
    ApolloCircularProgress,
    ApolloIcon,
    ApolloIconButton,
    ApolloTextfield,
} from '@picpay/design-system-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PicpayKeycloakProfile } from '@picpay/keycloak';
import clsx from 'clsx';
import { formOptions } from './form-schema';
import { Contact } from '../../models/contact.model';
import { ContactTag } from '../../models/contact-tag.model';
import { User } from '../../models/user.model';
import { EventTracking } from '@picpay/event-tracking';
import { contactQuery } from '../../data-access/contact/contact.query';
import { contactService } from '../../data-access/contact/contact.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface FormProps {
    dialogRef: MDCDialog;
    user?: PicpayKeycloakProfile<User>;
    slug: 'internal' | 'external';
    doc: string;
}

export function Form(props: FormProps): JSX.Element {
    const { dialogRef, user, slug, doc } = props;
    const [submitted, setSubmitted] = useState(false);
    const [formSent, setFormSent] = useState(false);
    const [formSentSuccess, setFormSentSuccess] = useState(true);
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [tags, setTags] = useState<ContactTag[]>();
    const [currentTag, setCurrentTag] = useState<ContactTag>();
    const checkboxRef = useRef(null);
    const { register, handleSubmit, formState, setValue, reset } = useForm<Contact>(formOptions);
    const { errors } = formState;
    const tags$ = contactQuery.select(slug || 'external');
    const unsubscribe$ = new Subject();

    useEffect(() => {
        tags$.pipe(takeUntil(unsubscribe$)).subscribe(res => {
            if (res) {
                setTags(res[doc]);
            }
        });

        if (user) {
            setValue('name', user.attributes.name[0]);
            setValue('email', user.email);
        }

        contactService.getTags();

        return function cleanup() {
            unsubscribe$.next();
            unsubscribe$.complete();
        };
    }, []);

    function onReset(): void {
        setSubmitted(false);
        setFormSent(false);
        setFormSentSuccess(true);
        EventTracking.track('Button Clicked', {
            button_name: 'BOTAO_TENTAR_NOVAMENTE_CONTATO',
            page_name: `STUDIO_PICPAY_${slug.toLocaleUpperCase()}`,
            context: `ERRO_TENTA_NOVAMENTE_CONTATO`,
        });
    }

    function onCancel(button_name?: string, context?: string): void {
        setSubmitted(false);
        setFormSent(false);
        setFormSentSuccess(true);
        setIsFormLoading(false);
        EventTracking.track('Button Clicked', {
            button_name,
            page_name: `STUDIO_PICPAY_${slug.toLocaleUpperCase()}`,
            context: `${context}`,
        });
        dialogRef.close();
        dialogRef.destroy();
        reset();
    }

    const onSubmit: SubmitHandler<Contact> = values => {
        setSubmitted(true);

        if (!checkboxRef?.current?.checked) {
            return;
        }
        setIsFormLoading(true);
        const contact = { ...values, ...currentTag };

        contactService
            .sendContact(contact)
            .pipe(takeUntil(unsubscribe$))
            .subscribe(
                res => {
                    setIsFormLoading(false);
                    setFormSent(true);
                    EventTracking.track('Button Clicked', {
                        button_name: 'BOTAO_ENVIAR_CONTATO',
                        page_name: `STUDIO_PICPAY_${slug.toLocaleUpperCase()}`,
                        context: 'SUCESSO_FORMULARIO_CONTATO',
                    });
                },
                err => {
                    setIsFormLoading(false);
                    setFormSent(true);
                    setFormSentSuccess(false);
                    EventTracking.track('Button Clicked', {
                        button_name: 'BOTAO_ENVIAR_CONTATO',
                        page_name: `STUDIO_PICPAY_${slug.toLocaleUpperCase()}`,
                        context: 'ERRO_FORMULARIO_CONTATO',
                    });
                },
            );
    };
    return (
        <div className="contact-form-wrapper">
            {formSent ? (
                <div className="feedback">
                    {formSentSuccess ? (
                        <div>
                            <header className="feedback__header">
                                <img
                                    alt="Feedback header"
                                    className="feedback__header--image"
                                    src="./assets/dev-portal/images/success.png"
                                />
                            </header>
                            <div className="feedback__content">
                                <h3 className="feedback__content--title">
                                    Nós recebemos os seus dados e entraremos em contato em breve!
                                </h3>
                                <p className="feedback__content--disclaimer">
                                    Você irá receber em breve um e-mail confirmando esse contato e nossa equipe entrará
                                    em contato o mais rápido possivel por e-mail ou telefone para te ajudar!
                                </p>
                            </div>
                            <div className="feedback__actions">
                                <ApolloButton
                                    id="btn_contact_close_form_success"
                                    onClick={() => onCancel('BOTAO_CONTATO_SUCESSO', 'SUCESSO_FORMULARIO_CONTATO')}
                                    size="sm"
                                >
                                    Ok, Entendi
                                </ApolloButton>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <header className="feedback__header">
                                <img
                                    alt="Feedback header"
                                    className="feedback__header--image"
                                    src="./assets/dev-portal/images/error.png"
                                />
                            </header>
                            <div className="feedback__content">
                                <h3 className="feedback__content--title">Algo deu errado!</h3>
                                <p className="feedback__content--disclaimer">
                                    Tivemos um problema para enviar os seus dados para nossa equipe. Por favor, volte e
                                    envie o formulário novamente para que possamos entrar em contato o mais rápido
                                    possível
                                </p>
                            </div>
                            <div className="feedback__actions">
                                <div>
                                    {' '}
                                    <ApolloButton
                                        type="button"
                                        id="btn_contact_close_form_try_again"
                                        onClick={onReset}
                                        size="md"
                                    >
                                        Tentar Novamente
                                    </ApolloButton>
                                </div>

                                <ApolloButton
                                    id="btn_contact_close_form_error"
                                    onClick={() =>
                                        onCancel('BOTAO_ERRO_FECHAR_JANELA_CONTATO', 'ERRO_FORMULARIO_CONTATO')
                                    }
                                    variant="link"
                                    size="sm"
                                >
                                    fechar janela
                                </ApolloButton>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="contact-form">
                    <header className="contact-form__header">
                        <div className="contact-form__header--title_container">
                            <h2 className="contact-form__header--title">
                                {user ? 'Habilitar um projeto' : 'Solicite contato'}
                            </h2>
                        </div>
                    </header>
                    <ApolloIconButton
                        className="contact-form__header--button_close"
                        data-mdc-dialog-action="cancel"
                        icon="interface-multiply"
                        icon-pack="interface"
                        label-off="Fechar janela"
                        size="md"
                        onClick={() => onCancel('BOTAO_FECHAR_CONTATO', 'FORMULARIO_CONTATO')}
                    ></ApolloIconButton>
                    <h3 className="contact-form__disclaimer">
                        Preencha o formulário e nossa equipe entrará em contato em breve
                    </h3>
                    <form className="contact-form__form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        {!user && (
                            <>
                                <ApolloTextfield
                                    name="name"
                                    idElement="name"
                                    label="Nome"
                                    size="md"
                                    maxLength="100"
                                    type="text"
                                    inputmode="text"
                                    className="contact-form__form--text-input"
                                    {...register('name')}
                                    helperText={errors.name?.message}
                                    invalid={!!errors.name}
                                    onApolloChange={e => setValue('name', e.detail, { shouldValidate: true })}
                                ></ApolloTextfield>
                                <ApolloTextfield
                                    name="email"
                                    idElement="email"
                                    label="Email comercial"
                                    size="md"
                                    maxLength="150"
                                    type="email"
                                    inputmode="email"
                                    className="contact-form__form--text-input"
                                    {...register('email')}
                                    helperText={errors.email?.message}
                                    invalid={!!errors.email}
                                    onApolloChange={e => setValue('email', e.detail, { shouldValidate: true })}
                                ></ApolloTextfield>
                            </>
                        )}
                        <ApolloTextfield
                            mask="(99) 99999-9999"
                            name="phone"
                            idElement="phone"
                            label="Telefone comercial"
                            size="md"
                            maxLength="15"
                            type="tel"
                            inputmode="tel"
                            className="contact-form__form--text-input"
                            {...register('phone')}
                            helperText={errors.phone?.message}
                            invalid={!!errors.phone}
                            onApolloChange={e => setValue('phone', e.detail, { shouldValidate: true })}
                        ></ApolloTextfield>
                        <div className="contact-form__form-wrapper">
                            <div className="contact-form__form--select-container">
                                <select
                                    name="tag"
                                    id="tag"
                                    className={clsx({
                                        'contact-form__form--select-input': true,
                                        'contact-form__form--select-input-error': formState.isSubmitted && errors?.tag,
                                    })}
                                    {...register('tag')}
                                    onChange={e => setCurrentTag(tags[e.target.value])}
                                    defaultValue="default"
                                >
                                    <option disabled value="default">
                                        Selecione
                                    </option>
                                    {tags?.map((tag, i) => {
                                        return (
                                            <option key={i} value={i}>
                                                {tag.subject}
                                            </option>
                                        );
                                    })}
                                </select>
                                <label className="contact-form__form--select-label" htmlFor="tag">
                                    Assunto *
                                </label>
                                <ApolloIcon
                                    size="sm"
                                    className="material-icon contact-form__form--arrow"
                                    svgIcon="arrows-angle-down-b"
                                />
                            </div>
                            {errors.tag && (
                                <span className="contact-form__form--error">
                                    <ApolloIcon svg-icon="feedback-exclamation-circle" size="sm" /> <ApolloIcon />
                                    Assunto é obrigatório!
                                </span>
                            )}
                        </div>
                        <ApolloTextfield
                            name="body"
                            idElement="body"
                            label="Mensagem"
                            size="md"
                            maxLength="200"
                            type="text"
                            className="contact-form__form--text-input textarea"
                            {...register('body')}
                            helperText={errors.body?.message}
                            invalid={!!errors.body}
                            onApolloChange={e => setValue('body', e.detail, { shouldValidate: true })}
                        ></ApolloTextfield>
                        <div
                            className={clsx({
                                'contact-form__form--checkbox-field': true,
                                'contact-form__form--checkbox-field-error': submitted && !checkboxRef?.current?.checked,
                            })}
                        >
                            <ApolloCheckbox
                                name="terms"
                                id="terms"
                                ref={checkboxRef}
                                invalid={formState.isSubmitted && !checkboxRef?.current?.checked}
                            >
                                <label className="contact-form__form--checkbox-label" htmlFor="terms">
                                    Eu li e aceito os{' '}
                                    <a href="https://picpay.com/site/privacidade" target="_blank" rel="noreferrer">
                                        termos de privacidade
                                    </a>
                                </label>
                            </ApolloCheckbox>
                            {formState.isSubmitted && !checkboxRef?.current?.checked && (
                                <span className="contact-form__form--error">
                                    <ApolloIcon svg-icon="feedback-exclamation-circle" size="sm" /> <ApolloIcon />
                                    Aceite dos termos é obrigatório!
                                </span>
                            )}
                        </div>
                        <div className="contact-form__form--action-container">
                            <ApolloButton
                                id="btn_contact_form_close"
                                onClick={() => onCancel('BOTAO_CANCELAR_CONTATO', 'FORMULARIO_CONTATO')}
                                variant="link"
                                size="sm"
                            >
                                Cancelar
                            </ApolloButton>
                            {!isFormLoading && (
                                <ApolloButton id="btn_contact_form_submit" type="submit" size="sm">
                                    Solicitar contato
                                </ApolloButton>
                            )}
                            {(isFormLoading || formState.isSubmitting) && (
                                <ApolloCircularProgress className="loading"></ApolloCircularProgress>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
